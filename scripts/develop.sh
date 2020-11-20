#!/usr/bin/env bash

set -e

CLI_NAME="$(basename "${BASH_SOURCE[0]}")"
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
REPO_NAME="$(basename "$(dirname "${DIR}")")"
DEFAULT_ALIAS="${REPO_NAME}-dev"
DEFAULT_DOMAIN="example.com"
[[ "$CI" == "true" ]] && DEFAULT_SFDX_DURATIONDAYS="1" || DEFAULT_SFDX_DURATIONDAYS="14"

SFDX_DURATIONDAYS="${SFDX_DURATIONDAYS:-${DEFAULT_SFDX_DURATIONDAYS}}"

_help() {
  echo "${CLI_NAME}."
  echo ""
  echo "> Setup an environment for development."
  echo ""
  echo "Usage:"
  echo "    ${CLI_NAME} [-a SETALIAS] [-u TARGETUSERNAME]"
  echo ""
  echo "Options:"
  echo "    -h --help                            show help"
  echo "    -a --setalias SETALIAS               set an alias for for the created scratch org (default: ${DEFAULT_ALIAS})"
  echo "    -u --targetusername TARGETUSERNAME   username or alias for the target org"
  echo ""
  echo "Environment Variables:"
  echo "    SFDX_DURATIONDAYS                    scratch org duration days (default: ${DEFAULT_SFDX_DURATIONDAYS})"
  echo ""
  echo "Examples:"
  echo "    View this help text"
  echo "    $ ${CLI_NAME} -h"
  echo ""
  echo "    Spin up and configure a scratch org"
  echo "    $ ${CLI_NAME}"
  echo ""
  echo "    Spin up and configure a scratch org with the given alias (one alphanumerical word, may contain '-_')"
  echo "    $ ${CLI_NAME} -a myfeature"
  echo ""
  echo "    Configure an existing org (this script can be applied multiple times)"
  echo "    $ ${CLI_NAME} -u myexistingorg"
  echo ""
  echo "    Specify a scratch org duration in days"
  echo "    $ SFDX_DURATIONDAYS=30 ${CLI_NAME} -a mylongrunningfeature"
}

_main() {
  # if no username given, create a new scratch org
  if [[ -z $username ]]; then
    alias="${alias:-${DEFAULT_ALIAS}}"
    if ! [[ "${alias}" =~ ^[A-Za-z0-9_\-]+$ ]]; then
      echo "ERROR: alias may only contain alphanumeric characters and '-_'"
      exit 1
    fi
    # create a new scratch org
    uniqueAlias="${alias}-$(openssl rand -hex 100 | head -c 12)"
    username="${uniqueAlias}@${DEFAULT_DOMAIN}"

    # shellcheck disable=SC2068
    sfdx force:org:create -f config/project-scratch-def.json \
      -a "$alias" \
      -s \
      --durationdays "${SFDX_DURATIONDAYS}" \
      username="${username}" description="${alias}" ${POSITIONAL_ARGS[@]}
  else
    # resolve the given username if it is an alias
    alias="${username}"
    username="$(sfdx force:org:display -u "${username}" | grep -e "^Username" | awk '{print $2}')"
    # set a default alias if a real username was given
    if [[ "${alias}" == "${username}" ]]; then
      alias="${DEFAULT_ALIAS}"
    fi
    EXIT_ON_ERROR="${EXIT_ON_ERROR:-false}"
  fi

  if [[ "${EXIT_ON_ERROR}" == "false" ]]; then
    echo "[WARN]: This script will not exit on errors."
    set +e
  fi

  if [[ "$TRACE" ]]; then
    set -x
  fi

  # update user
  sfdx force:data:record:update -u "$username" -s User -w "Username='${username}'" -v "FirstName='Admin' LastName='${alias}'"

  # push metadata
  sfdx force:source:push -u "$username"

  # open org in browser
  if [[ "$CI" != "true" ]]; then
    sfdx force:org:open -u "$username"
  fi
}

if [[ "$0" == "${BASH_SOURCE[0]}" ]]; then
  set -eo pipefail
  POSITIONAL_ARGS=()
  while [[ "$#" -gt 0 ]]; do case $1 in
    -h|--help) _help; exit 0;;
    -a|--setalias) alias="$2"; shift 2;;
    -u|--targetusername) username="$2"; shift 2;;
    *) POSITIONAL_ARGS+=("$1"); shift;;
  esac; done
  _main "${POSITIONAL_ARGS[@]}"
fi

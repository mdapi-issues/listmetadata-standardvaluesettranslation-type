#!/usr/bin/env bash

set -eo pipefail

sf org create scratch -f config/project-scratch-def.json \
  --alias "mdapi-issues-standardvaluesettranslation-type" \
  --set-default
sf project deploy start

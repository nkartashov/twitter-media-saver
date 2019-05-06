#!/bin/bash

npx web-ext sign --id='{'"${APP_ID}"'}' --api-key="${FF_JWT_ISSUER}" --api-secret="${FF_JWT_SECRET}" --channel=listed

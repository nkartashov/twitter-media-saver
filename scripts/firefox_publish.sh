#!/bin/bash

npx web-ext sign --api-key="${FF_JWT_ISSUER}" --api-secret="${FF_JWT_SECRET}" --channel=listed

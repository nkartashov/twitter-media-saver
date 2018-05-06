#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEMP_DIR="$(mktemp -d)"
cp -r "$SCRIPT_DIR"/ "$TEMP_DIR"

rm -rf "$TEMP_DIR"/.git
rm -rf "$TEMP_DIR"/.gitignore
rm -rf "$TEMP_DIR"/.DS_Store
rm -rf "$TEMP_DIR"/release.*

zip -r "$SCRIPT_DIR"/release.zip "$TEMP_DIR"/
rm -rf "$TEMP_DIR"

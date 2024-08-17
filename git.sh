#!/bin/env bash
bun run build
git add .
git commit -m "$*"
git push
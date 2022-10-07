#!/bin/sh

# SOURCE: https://dev.to/itsrennyman/manage-nextpublic-environment-variables-at-runtime-with-docker-53dl

echo "Check that we have NEXT_PUBLIC_GITHUB_AUTH_PAT_TOKEN var"
test -n "$NEXT_PUBLIC_GITHUB_AUTH_PAT_TOKEN"

find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_GITHUB_AUTH_PAT_TOKEN#$NEXT_PUBLIC_GITHUB_AUTH_PAT_TOKEN#g"

echo "Starting Nextjs"
exec "$@"

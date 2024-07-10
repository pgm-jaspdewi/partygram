#!/bin/sh
source .env.local

supabase gen types typescript --project-id $EXPO_PUBLIC_SUPABASE_PROJECT_ID > database-generated.types.ts

# For this to work you need to execute the following command: chmod +x ./fetch-supabase.sh
# However, chmod (or an equivalent) does not exist for windowsOS
# Therefor this file is useless.
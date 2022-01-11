if [ -d "node_modules" ] && [ -n "$(ls -A "node_modules")" ]; then
   echo "devcontainer up"
else
   npm ci
fi

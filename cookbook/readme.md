# Effection Cookbook
## List of Recipes from Issue [#334](https://github.com/thefrontside/effection/issues/334)
- [ ] Running multiple processes
- [ ] Subscribing to stuff
- [ ] Catching errors to external processes
- [ ] Well behaved CLI
- [x] Closing Sockets
- [ ] File watcher
- [ ] Interprocess communication
- [ ] Type Ahead

### Websocket (./websocket/)
To start websocket:
```
yarn websocket
```
Then type and enter string to get a response from the websocket.
`Ctrl+C` twice to exit.

### Websocket Chat (./websocket-chat/)
Start client:
```
yarn chat:client
```
Start server in a separate terminal:
```
yarn chat:server
```
Click on the parcel-generated from the first terminal to open client in browser and in the second terminal you should see notification that a client has been connected

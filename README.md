# gRPC-starter
start your gRPC project

# Install these to start for React App as Client
1. apt install protobuf
2. npm install -g protoc-gen-grpc-web
3. npm install -g protoc-gen-js
4. npm install grpc-web
5. npm install google-protobuf
6. protoc -I=. todo.proto \
  --js_out=import_style=commonjs:./generated \
  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./generated


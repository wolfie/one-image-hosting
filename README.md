# One Image Hosting

Maybe the most awesome way to host a single image.

## Running

1. Clone the repo
2. Come up with a shared secret (a [UUID](https://www.uuidgenerator.net/version4) is a good candidate)

Now you need to decide whether you want to run it on [Node](#node) or [Docker](#docker)

### Node

3. Run the following command (substituting `{PORT}` and `{YOUR SHARED SECRET}` values with what's applicable to you): 
```shell
yarn install  # or "npm install"
PORT={PORT} SHARED_SECRET="{YOUR SHARED SECRET}" npm start
```

### Docker

3. Build the image with the command (substituting `{YOUR SHARED SECRET}` with what's applicable to you):

```shell
docker build \
  --build-arg SHARED_SECRET="{YOUR SHARED SECRET}" \
  -t one-image-hosting \
  .
```

4. Start the container (substituting `{PORT}` with the port you want to run the container on)
```shell
docker run -p {PORT}:8000 one-image-hosting
```

## Updating the image

You need to do a `HTTP PUT` call to the server's `/image.jpg` path (e.g. `http://localhost:8080/image.jpg`) with a header `x-shared-secret` with the value and the file contents as a `form-data` file upload.

You can do this with e.g. [cURL](https://curl.haxx.se/) (replacing `{PORT}`, `{YOUR SHARED SECRET}` and `{ABSOLUTE FILE PATH}` as appropriate):
```shell
curl -X PUT \
  http://localhost:{PORT}/image.jpg \
  -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  -H 'x-shared-secret: {YOUR SHARED SECRET}' \
  -F 'image.jpg=@{ABSOLUTE FILE PATH}'
```


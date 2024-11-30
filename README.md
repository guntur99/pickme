# `PICK ME`

PICKME is a multi-event ticketing platform that is flexible, transparent, and secure. It accommodates events ranging from small-scale gatherings like live music at cafes to international events. Anyone can create events, and all event activities and ticket purchases are conducted transparently and anonymously. The platform is secure, utilizing blockchain technology, which is decentralized, and smart contracts to ensure robust safety. It also offers various features, including rewards in the form of NFTs and tokens.

- [Video Demo](https://youtu.be/8KNDj6gYdo0)

# `INSTALLATION`
1. git clone
2. run ./download-face-detection-model.sh
3. run (install python & pip first) 
    1. pip3 install facenet-pytorch 
    2. pip3 install torch 
    3. pip3 install onnx
4. run python3 and enter
    1. import torch
    2. import facenet_pytorch
    3. resnet = facenet_pytorch.InceptionResnetV1(pretrained='vggface2').eval()
    4. input = torch.randn(1, 3, 160, 160)
    5. torch.onnx.export(resnet, input, "face-recognition.onnx", verbose=False, opset_version=11)
5. run cargo install wasm-opt (npm install first if nodejs not installed)
6. run
    1. dfx start --background
    2. dfx deploy
7. run cargo install ic-file-uploader
8. run ./upload-models-to-canister.sh

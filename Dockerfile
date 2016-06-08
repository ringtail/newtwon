FROM node:5-slim
ADD . /workspace
CMD ["node","/workspace/index.js"]

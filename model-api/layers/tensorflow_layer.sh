export WORK_DIR=$(pwd)
pip install tensorflow
pip uninstall tensorboard
pip uninstall keras-applications
cd venv/Lib/site-packages
zip -r ${WORK_DIR}/ml-layer.zip . --exclude \*.pyc /external/* /tensorflow/contrib/* /tensorflow/include/unsupported/* /tensorflow/examples/* /pip/* /pip-9.0.1.dist-info/*

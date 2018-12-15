export WORK_DIR=$(pwd)
pip install flask
cd venv/Lib/site-packages
zip -r ${WORK_DIR}/flask-layer.zip .
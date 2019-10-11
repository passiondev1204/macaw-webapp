# !/bin/bash
cp -R /volumes/lifted/XPlatform/graphing/Graphing/ /volumes/lifted/ios/CrossPlatform/
cp -R /volumes/lifted/XPlatform/graphing/Demo/ /volumes/lifted/ios/CrossPlatform/
cp -R /volumes/lifted/XPlatform/graphing/Specifications/ /volumes/lifted/ios/CrossPlatform/
cp -R /volumes/lifted/XPlatform/graphing/Screenshots/ /volumes/lifted/ios/CrossPlatform/
cp -R /volumes/lifted/XPlatform/graphing/Tools/ /volumes/lifted/ios/CrossPlatform/
cp /volumes/lifted/XPlatform/graphing/README.md /volumes/lifted/ios/CrossPlatform/
cp /volumes/lifted/XPlatform/graphing/Licenses.md /volumes/lifted/ios/CrossPlatform/

xpjsdoc
xpiosjsdoc

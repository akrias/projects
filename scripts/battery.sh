#bin/bash

LIST=`adb devices | grep -v List | awk '{print $1}'`

echo "**********************************"
for UDID in $LIST
do
    #level=`adb -s $UDID shell dumpsys battery | grep level | sed -r 's/^[^0-9]*([0-9]+).*/\1/g'`
    level=`adb -s $UDID shell dumpsys battery | grep level`
    battery=`echo $level | sed -r 's/^[^0-9]*([0-9]+).*/\1/g'`
    model=`adb -s $UDID shell getprop | grep ro.product.model`
    
    if [ "$1" = "all" ]; then
      echo $UDID
      echo $model
      echo "Battery level: $battery"
      echo "**********************************"    

    elif [ $battery -le 75 ]; then
      model=`adb -s $UDID shell getprop | grep ro.product.model`
      echo $UDID
      echo $model
      echo "Battery level: $battery"
      echo "**********************************"
    fi
done


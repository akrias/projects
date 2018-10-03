#!/bin/bash

#NOTE: this script only works on android evices on 5.0 OS or above. Kit kat and below does not
#		include a report function in the crash popup

LIST=`adb devices | grep -v List | awk '{print $1}'`

function device_res {
    model1=`adb -s $1 shell getprop | grep ro.product.model | grep -v List | awk '{print $2}' | tr -d '\r'`
    #echo $model1
	model2=${model1/\[/};
    #echo $model2
    model=${model2/\]};
	echo $model

    ANR_x=0
    ANR_y=0
    report_x=0
    report_y=0
    arrow_x=0
    arrow_y=0
    
    #LG G3 (LG-D855)
    if [[ "$model" = "LG-D855" ]]; then
        echo "this is LG G3 EYAHHHHH"
        ANR_x=700
        ANR_y=1050
        report_x=270
        report_y=1400
        arrow_x=1320
        arrow_y=180
        
    elif [[ "$model" = "Nexus" ]]; then
    	echo "this is a nexus...."
    	nexus1=`adb -s $1 shell getprop | grep ro.product.model | grep -v List | awk '{print $3}' | tr -d '\r'`
	    nexus=${nexus1/\]};
    	if [[ "$nexus" = "6" ]]; then
    		echo "NEXUS 6 BOIS"
    		ANR_x=700
        	ANR_y=900
	        report_x=270
    	    report_y=1400
        	arrow_x=1320
            arrow_y=180
    			
    	fi
    	
    	elif [[ "$nexus" = "5" ]]; then
			echo "hammertime"
			ANR_x=530
        	ANR_y=780
	        report_x=270
    	    report_y=1050
        	arrow_x=970
            arrow_y=150
		fi
    fi
}



for UDID in $LIST
do
	echo $UDID
	# opens app
	echo "Opening up crash test app..."

	device_res $UDID
	
	adb -s $UDID shell am start -a com.test.google.play.appex.crashyapp.MainActivity -n com.test.google.play.appex.crashyapp/com.test.google.play.appex.crashyapp.MainActivity
	sleep 3;

	# ANR button tap
	echo "Tapping ANR button..."

	for i in {1 .. 5}
	do
		adb -s $UDID shell input tap $ANR_x $ANR_y
		#echo $ANR_x $ANR_y
	done
	echo "done"
	echo "Waiting for app to crash..."

	sleep 10
	echo "Tapping Report button..."
	adb -s $UDID shell input tap $report_x $report_y
	echo "done"

	sleep 5

	# Next arrow button tap
	echo "Tapping next arrow button..."
	adb -s $UDID shell input tap $arrow_x $arrow_y
	echo "done"
	sleep 3

	# exit
	echo "Exiting..."
	adb -s $UDID shell input tap 700 2500
	
	
	# extracting log files from device
	echo "Pulling ANR files..."
	mkdir ~/ANR;
	adb -s $UDID shell su -c 'rm -Rf /data/local/tmp/ANR';
	adb -s $UDID shell su -c 'mkdir /data/local/tmp/ANR';
	adb -s $UDID shell su -c 'chmod 777 /data/local/tmp/ANR';
	adb -s $UDID shell su -c 'cp -f /data/system/dropbox/* /data/local/tmp/ANR/';
	adb -s $UDID shell su -c 'chmod 666 /data/local/tmp/ANR/*';
	time=$(date "+%Y-%m-%d_%H-%M-%S")
	dir=$UDID.$time
	mkdir ~/ANR/$dir
	adb -s $UDID pull /data/local/tmp/ANR/ ~/ANR/$dir
	sleep 3
	adb -s $UDID reboot
done


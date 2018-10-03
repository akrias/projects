#This script is used to batch supervise all the devices attaching to thit mac machine.

# To run this script on mac machine:
# $./supervise_device.sh <wifi_ssid> <wifi_password>

if [[ $# -lt 2 ]]; then
   echo "Need two arguments: wifi ssid and wifi password"
   exit 1
fi

SSID="$1"
PSK="$2"

echo "Reset devices..."
cfgutil -f erase
sleep 180
echo "Devices were reset."

echo "Supervise devices..."
./cfgutil_util.par supervise_device
sleep 180
echo "Devices were supervised."

echo "Setting wifi..."
./cfgutil_util.par set_wifi -ssid ${SSID} -password ${PSK}
sleep 40
echo "Set wifi done."

echo "Block iOS system upgrade..."
./cfgutil_util.par block_upgrade
sleep 30
echo "Blocked iOS system upgrade."

echo "Reboot devices..."
for id in `/opt/idevicetools/bin/idevice_id -l`
do
  /opt/idevicetools/bin/idevicediagnostics restart -u ${id}
done
sleep 60
echo "Devices rebooted."

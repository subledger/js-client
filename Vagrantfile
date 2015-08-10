# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

# Startup script
$script = <<SCRIPT
sudo apt-get update
sudo apt-get install -y npm git
cd /vagrant
sudo npm install grunt-cli -g
sudo npm install -g npm@latest
sudo ln -s /usr/bin/nodejs /usr/bin/node
sudo rm /usr/bin/npm
sudo ln -s /usr/bin/local/npm /usr/bin/npm
npm install
SCRIPT

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.provision "shell", inline: $script
end

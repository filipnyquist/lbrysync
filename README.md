
# LBRYsync

So you want to sync some stuff to LBRY? Great, this is the perfect tool!

## Prerequisites

You need to have the latest version of nodejs installed. Get the installer from [the NodeJS webpage](https://nodejs.org/en/) and install the latest LTS release. This synctool requires Node.js > 8.0.0.

After you have installed Node.js download the latest version of the Synctool [here](https://github.com/filipnyquist/lbrysync/archive/master.zip) or clone the git.

Open a console(CMD/Powershell on windows or a terminal on Linux/OSX) in the synctool folder.

Run the command `npm install` in the lbrysync folder.

## How do I run this magic software?
Now when all dependencies are installed, and we can go over to the layout of our CSV file which will contain information about the content.
All possible fields available in the CSV file are:
title | description | author | language | license | license_url | thumbnail | nsfw | thumbnail | channel_name | claim_address
------------ | ------------- | ------------ | ------------- | ------------ | ------------- | ------------ | ------------- | ------------ | ------------- | ------------
**The only ones required are file_path, bid and name.** All of the other fields that are not in the csv file will use the standard config that is set in the configuration file under the folder config. **NOTE: You should only set claim_address if you know what you are doing. If you are a normal user LBRY will automatically generate an address.**

### Example of how a csv file could be structured:

**name**|**bid**|**file\_path**|**title**|**description**|**author**|**language**|**license**|**license\_url**|**thumbnail**|**nsfw**|**channel\_name**
:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:
fill-testsync-1|0.1|C:\testitems\pic1.png|fillerino testsync 1|The first testsync!|Fillerino synctool v0.0.1|en|The MIT License|https://opensource.org/licenses/MIT|https://i.imgur.com/aVRj0fh.png|FALSE|@fillerinodev
fill-testsync-2|0.1|C:\testitems\pic2.png|fillerino testsync 2|The second testsync!|Fillerino synctool v0.0.1|en|The MIT License|https://opensource.org/licenses/MIT|https://i.imgur.com/aVRj0fh.png|FALSE|@fillerinodev
fill-testsync-3|0.1|C:\testitems\pic3.png|fillerino testsync 3|The third testsync!|Fillerino synctool v0.0.1|en|The MIT License|https://opensource.org/licenses/MIT|https://i.imgur.com/aVRj0fh.png|FALSE|@fillerinodev
fill-testsync-4|0.1|C:\testitems\pic4.png|fillerino testsync 4|The forth testsync!|Fillerino synctool v0.0.1|en|The MIT License|https://opensource.org/licenses/MIT|https://i.imgur.com/aVRj0fh.png|FALSE|@fillerinodev
fill-testsync-5|0.1|C:\testitems\pic5.png|fillerino testsync 5|The fifth testsync!|Fillerino synctool v0.0.1|en|The MIT License|https://opensource.org/licenses/MIT|https://i.imgur.com/aVRj0fh.png|FALSE|@fillerinodev
fill-testsync-6|0.1|C:\testitems\pic6.png|fillerino testsync 6|The sixth testsync!|Fillerino synctool v0.0.1|en|The MIT License|https://opensource.org/licenses/MIT|https://i.imgur.com/aVRj0fh.png|FALSE|@fillerinodev

In this example above you can see that I´ve only used a selected amount of all the options, that is ***because all other parameters are loaded from the standard config!***
***The channel used to publish (if any) must be created outside of the synctool and must have been accepted on the chain before you can sync!***

### Time to sync!

**When you have everything you want to sync in the CSV file run `node lbrysync.js -i "<path to CSV file>"` in the lbrysync directory and it will start syncing. Be sure to have the amount that it takes to publish. LBRYsync will then begin the syncing and will output the status after every claim; everything will also be logged in the log folder.**

All the synced items are stored in a simple JSON database so you can restart LBRYsync and it will begin from where it last where!

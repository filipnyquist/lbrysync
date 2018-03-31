# LBRYSYNC
_This is a placeholder readme, it will be updated_

LBRYsync is a tool to easily sync different files types onto the LBRY blockchain with the help of a csv file or soon-to-be other types of files aswell.

## Usage:
* Either download the repo and run it in a node.js environment with `npm install` and `node lbrysync.js`.
* Or download the executable from the releases page, which hosts the latest version in a binary version that can be used anywhere.
* Checkout the example.csv file for more information on csv layout. All configurable values that isn´t in the csv file will be using the standardConfig ones from the config file. Please change the config before running the script.

```
   Options:
 
     -V, --version        output the version number
     -i, --input <value>  The path to the file with the information on what to sync.
     -h, --help           output usage information
   Example:
 
     $ lbrysync -i "Path to file"
```

async function readTag() {
    console.log('Clicked readTag');
    if ("NDEFReader" in window) {
      const ndef = new NDEFReader();
      try {
        await ndef.scan();
        console.log('Scan Started');
        // ndef.onreading = event => {
        //   const decoder = new TextDecoder();
        //   for (const record of event.message.records) {
        //     console.log("Record type:  " + record.recordType);
        //     console.log("MIME type:    " + record.mediaType);
        //     console.log("=== data ===\n" + decoder.decode(record.data));
        //   }
        // }
        ndef.addEventListener("readingerror", (error) => {
            console.log("Argh! Cannot read data from the NFC tag. Try another one?", error);
          });
      
          ndef.addEventListener("reading", ({ message, serialNumber }) => {
            console.log(`> Serial Number: ${serialNumber}`);
            console.log(`> Records: (${message.records.length})`);
          });
      } catch(error) {
        console.log(error);
      }
    } else {
      console.log("Web NFC is not supported.");
    }
  }
  
  async function writeTag() {
    if ("NDEFReader" in window) {
      const ndef = new NDEFReader();
      try {
        await ndef.write("What Web Can Do Today");
        console.log("NDEF message written!");
      } catch(error) {
        console.log(error);
      }
    } else {
      console.log("Web NFC is not supported.");
    }
  }

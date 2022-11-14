console.log('layout.js');

const connectToBackendTest = async () => {
    let url = 'https://trackit-sillicon-alley.herokuapp.com/';
    const testRoot = await fetch(url);
    const data = await testRoot.text();
    console.log(data);
    return data;
}

connectToBackendTest();

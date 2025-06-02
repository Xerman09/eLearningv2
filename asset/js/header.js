const version = '1.0.0.1';

function eLearningHeader(){
    return `
    <div class="w3-bar w3-top w3-black w3-large" style="z-index:4">
        <button class="w3-bar-item w3-button w3-hide-large w3-hover-none w3-hover-text-light-grey" onclick="w3_open();"><i class="fa fa-bars"></i>  Menu</button>
        <span class="w3-bar-item w3-left">eLearning</span>
        <span class="w3-bar-item w3-right">V.${version}</span>
        <span class="w3-bar-item w3-right"><a href="./index.html">HOME</a></span>
    </div>

    `;
}
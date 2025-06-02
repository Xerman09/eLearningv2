export function containerContent(array, id) {
    const container = document.getElementById(id);
    // Loop through the content array
    for (let i = 0; i < array.length; i++) {
        // Create an HTML block dynamically
        let htmlBlock = `
          <div class="w3-quarter">
              <a href="${array[i].link}">
                <div class="w3-container con-with-sh con-hover mrt-20">
                  <div class="w3-left"></div>
                    <div class="w3-right">
                    </div>
                  <div class="w3-clear"></div>
                  <h6 style="text-align: center;">${array[i].subjectTitle}</h6>
                </div>
              </a>
          </div>
        `;

        // Insert the HTML block into the container
        container.innerHTML += htmlBlock;
    }
}

function extractQuestionNumber(code) {
  if (!code) return '';
  const parts = code.split('-');
  return parts.length > 1 ? parts[1] : code; // fallback to entire code if no dash
}

export function solEqManual(array, id){
  const params = new URLSearchParams(window.location.search);
  const code = params.get('subject');
  const topic = params.get('topic');
  const container = document.getElementById(id);
  // Loop through the content array
  for (let i = 0; i < array.length; i++) {
      // Create an HTML block dynamically
      let htmlBlock = `
        <div class="w3-quarter">
            <a href="solution.html?subject=${code}&topic=${topic}&question=${array[i].code}">
              <div class="w3-container con-with-sh con-hover mrt-20">
                <div class="w3-left"></div>
                  <div class="w3-right">
                  </div>
                <div class="w3-clear"></div>
                <h6 style="text-align:;">${extractQuestionNumber(array[i].code)}. <span class="eq-math" data-latex="${array[i].eq}"></span>
</h6>
              </div>
            </a>
        </div>
      `;

      // Insert the HTML block into the container
      container.innerHTML += htmlBlock;
  }
}
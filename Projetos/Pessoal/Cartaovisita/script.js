  let isResizing = false;
        let lastDownX = 0;
        let lastDownY = 0;

        function updateCard() {
            const name = document.getElementById("name").value;
            const title = document.getElementById("title").value;
            const company = document.getElementById("company").value;
            const phone = document.getElementById("phone").value;
            const email = document.getElementById("email").value;
            const imageInput = document.getElementById("imageInput").files[0];

            document.getElementById("card-name").innerText = name;
            document.getElementById("card-title").innerText = title;
            document.getElementById("card-company").innerText = company;
            document.getElementById("card-phone").innerText = phone;
            document.getElementById("card-email").innerText = email;

            const cardImage = document.getElementById("card-image");
            if (imageInput) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    cardImage.src = e.target.result;
                    cardImage.style.display = "block";
                }
                reader.readAsDataURL(imageInput);
            } else {
                cardImage.style.display = "none";
            }

            document.getElementById("card").style.display = "block";
        }

        function removeImage() {
            document.getElementById("imageInput").value = "";
            document.getElementById("card-image").style.display = "none";
        }

        function clearForm() {
            document.getElementById("name").value = "";
            document.getElementById("title").value = "";
            document.getElementById("company").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("email").value = "";
            removeImage();
            updateCard();
        }

        function resizeStart(e) {
            isResizing = true;
            lastDownX = e.clientX;
            lastDownY = e.clientY;
        }

        function resizeMove(e) {
            if (!isResizing) return;

            const cardImage = document.getElementById("card-image");
            const dx = e.clientX - lastDownX;
            const dy = e.clientY - lastDownY;

            const newWidth = cardImage.offsetWidth + dx;
            const newHeight = cardImage.offsetHeight + dy;

            cardImage.style.width = newWidth + "px";
            cardImage.style.height = newHeight + "px";

            lastDownX = e.clientX;
            lastDownY = e.clientY;
        }

        function resizeEnd() {
            isResizing = false;
        }

        const resizeHandle = document.querySelector('.resize-handle');
        resizeHandle.addEventListener('mousedown', resizeStart);
        document.addEventListener('mousemove', resizeMove);
        document.addEventListener('mouseup', resizeEnd);

        function saveCard() {
            const card = document.getElementById('card');
            html2canvas(card).then(canvas => {
                const link = document.createElement('a');
                link.download = 'cracha.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        }
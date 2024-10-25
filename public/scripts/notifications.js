const socket = io();

socket.on("paymentReceived", function (data) {
  const notificationElement = document.createElement("div");
  notificationElement.className = "notification";
  notificationElement.innerHTML = `
        <div class="notif-content">
            <p>${data.username} was just paid ${data.amount} to their ${
    data.method
  }</p>
            <small>${new Date().toLocaleTimeString()}</small>
        </div>
    `;
  document.body.appendChild(notificationElement);

  setTimeout(() => {
    notificationElement.remove();
  }, 5000);
});

    document.addEventListener('DOMContentLoaded', function() {
            loadNotifications();
        });

        function loadNotifications() {
            const container = document.getElementById('notifications-container');
            
            // Simulated notifications data - replace with actual API call
            const notifications = [
                {
                    id: 1,
                    type: 'info',
                    message: 'Welcome to your notifications!',
                    timestamp: new Date().toISOString(),
                    read: false
                },
                {
                    id: 2,
                    type: 'alert',
                    message: 'New message received',
                    timestamp: new Date().toISOString(),
                    read: false
                }
            ];

            notifications.forEach(notification => {
                const notificationElement = createNotificationElement(notification);
                container.appendChild(notificationElement);
            });
        }

        function createNotificationElement(notification) {
            const div = document.createElement('div');
            div.className = `col-12 col-md-8 col-lg-6 mb-3`;
            
            const card = document.createElement('div');
            card.className = `card ${notification.read ? 'bg-light' : 'border-primary'}`;
            card.setAttribute('data-notification-id', notification.id);
            
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            const content = document.createElement('div');
            content.className = 'mb-3';
            content.innerHTML = `
                <h5 class="card-title text-${notification.read ? 'secondary' : 'primary'}">${notification.type.toUpperCase()}</h5>
                <p class="card-text">${notification.message}</p>
                <small class="text-muted">${new Date(notification.timestamp).toLocaleString()}</small>
            `;

            const actions = document.createElement('div');
            actions.className = 'd-flex justify-content-end gap-2';
            
            const markReadBtn = document.createElement('button');
            markReadBtn.className = `btn btn-sm ${notification.read ? 'btn-outline-secondary' : 'btn-outline-primary'}`;
            markReadBtn.textContent = notification.read ? 'Mark as unread' : 'Mark as read';
            markReadBtn.onclick = () => toggleReadStatus(notification.id);

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-sm btn-outline-danger';
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => deleteNotification(notification.id);

            actions.appendChild(markReadBtn);
            actions.appendChild(deleteBtn);

            cardBody.appendChild(content);
            cardBody.appendChild(actions);
            card.appendChild(cardBody);
            div.appendChild(card);

            return div;
        }

        function toggleReadStatus(notificationId) {
            const notification = document.querySelector(`[data-notification-id="${notificationId}"]`);
            if (notification) {
                const isRead = notification.classList.contains('bg-light');
                notification.classList.toggle('bg-light');
                notification.classList.toggle('border-primary');
                const title = notification.querySelector('.card-title');
                title.classList.toggle('text-secondary');
                title.classList.toggle('text-primary');
                const markReadBtn = notification.querySelector('.btn-sm');
                markReadBtn.classList.toggle('btn-outline-secondary');
                markReadBtn.classList.toggle('btn-outline-primary');
                markReadBtn.textContent = isRead ? 'Mark as read' : 'Mark as unread';
                
                // Here you would typically make an API call to update the read status
            }
        }

        function deleteNotification(notificationId) {
            const notification = document.querySelector(`[data-notification-id="${notificationId}"]`).parentElement;
            if (notification) {
                notification.remove();
                // Here you would typically make an API call to delete the notification
            }
        }
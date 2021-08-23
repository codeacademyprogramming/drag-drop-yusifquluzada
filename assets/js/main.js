const listItemDraggables = Array.from(document.querySelectorAll('.list-item-draggable'));
const ourLists = Array.from(document.querySelectorAll('.our-list'));

listItemDraggables.forEach(listItem => {
    listItem.addEventListener('dragstart', function (e) {
        e.dataTransfer.setData('text', this.id);
    });
});

ourLists.forEach(list => {
    list.addEventListener('dragover', function (e) {
        e.preventDefault();
    });


    list.addEventListener('drop', function (e) {
        const draggedListItem = document.getElementById(e.dataTransfer.getData('text'));
        this.append(draggedListItem);
    });
});


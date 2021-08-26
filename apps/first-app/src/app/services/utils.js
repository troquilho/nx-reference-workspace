export const clearForm = () => {
    Array.from(document.querySelectorAll("input")).forEach(input => {
        input.value = "";
    });
    Array.from(document.querySelectorAll("select")).forEach(input => {
        input.value = 1;
    });
}
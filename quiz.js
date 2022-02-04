let state = {
    currentQuestion: 0,
    questions: []
}

const initState = () => {
    state.questions = questions;
}

const render = () => {
    const question = state.questions[state.currentQuestion];

    const choosen = 'answer' in question ? question.answer : -1;
    document.getElementById("question").innerHTML = question.question;
    const answers = question.answers.map((answer, index) => "<li><input type='radio' value='" + index + "' " + (choosen === index ? "checked" : "") + " >" + answer + "</li>");
    document.getElementById("answers").innerHTML = answers.join("");

    const inputs = document.getElementById("answers").getElementsByTagName("input");
    [...inputs].map(input => input.addEventListener("click", event => {
        const question = state.questions[state.currentQuestion];
        state.questions[state.currentQuestion] = {...question, answer: parseInt(event.target.value)};
        window.setTimeout(() => render(), 100);
    }));

    document.getElementById("left").disabled = state.currentQuestion == 0;
    const isLastQuestion = state.currentQuestion == state.questions.length - 1;
    const isQuestionAnswered = 'answer' in question;
    document.getElementById("right").disabled = isLastQuestion || !isQuestionAnswered;

    document.getElementById("submit").disabled = !isLastQuestion || !isQuestionAnswered;
}

window.addEventListener("load", event => {
    initState();
    render();

    document.getElementById("left").addEventListener("click", event => {
        state.currentQuestion--;
        render();
    });

    document.getElementById("right").addEventListener("click", event => {
        state.currentQuestion++;
        render();
    });

    document.getElementById("submit").addEventListener("click", event => {
        alert("Finished - TODO");
    });
});

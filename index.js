const quotes = [
  "When you have eliminated the impossible, whatever remains, however improbable, must be the truth.",
  "There is nothing more deceptive than an obvious fact.",
  "I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.",
  "I never make exceptions. An exception disproves the rule.",
  "What one man can invent another can discover.",
  "Nothing clears up a case so much as stating it to another person.",
  "Education never ends, Watson. It is a series of lessons, with the greatest for the last.",
  "The intricate patterns on the ancient Greek vase were a testament to the skill of the long-forgotten artisan who had carefully crafted it.",
  "The complex algorithm required a deep understanding of advanced mathematical concepts, making it a challenging problem to solve.",
  "The soft, golden light of the setting sun cast a warm glow over the rolling hills and verdant forests of the countryside.",
  "The historic mansion, with its grand ballrooms and sweeping staircases, had been beautifully restored to its former glory.",
  "The meandering river wound its way lazily through the heart of the city, providing a peaceful oasis for residents and visitors alike.",
  "The renowned scientist, who had spent decades studying the behavior of subatomic particles, was finally awarded the Nobel Prize in Physics for her groundbreaking research.",
  "The majestic mountain range, with its snow-capped peaks and lush green valleys, was a popular destination for hikers and nature lovers from all over the world.",
  "The elaborate costume, with its intricate embroidery and delicate lace, was a masterpiece of fashion design, perfectly capturing the essence of the bygone era.",
  "The sprawling metropolis, with its towering skyscrapers and bustling streets, was a hub of economic activity, attracting entrepreneurs and innovators from far and wide.",
  "The ancient, leather-bound tome, with its yellowed pages and mysterious symbols, was a treasured artifact, holding secrets and stories of a long-forgotten civilization.",
  "The beautiful, hand-painted ceramic vase was a stunning example of traditional craftsmanship, showcasing the artisan's skill and attention to detail.",
  "The state-of-the-art research facility, equipped with cutting-edge technology and staffed by leading experts, was at the forefront of medical innovation.",
  "The picturesque village, nestled in the heart of the countryside, was a popular destination for tourists seeking a tranquil and relaxing getaway.",
  "The complex system of underground tunnels and hidden passageways was a testament to the ingenuity and resourcefulness of the ancient civilization.",
  "The stunning work of art, with its vibrant colors and bold brushstrokes, was a masterpiece of modern expressionism, evoking powerful emotions and sparking lively debate.",
];

// grab UI items
const quoteElement = document.getElementById("quote");
const messageElement = document.getElementById("message");
const typedValueElement = document.getElementById("typed-value");

// array for storing the words of the current challenge
let words = [];
let wordIndex = 0;
let errorCount = 0;
const startTime = Date.now();

document.getElementById("start").addEventListener("click", () => {
  //  get the quote index
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[quoteIndex];

  messageElement.innerHTML = "";
  wordIndex = 0;
  errorCount = 0;

  words = quote.split(" ");
  const quoteSpan = words.map((word) => `<span>${word} </span>`);
  quoteElement.innerHTML = quoteSpan.join("");
  //   highlight the first word of the quote
  quoteElement.childNodes[0].className = "highlight";
});

typedValueElement.addEventListener("input", () => {
  const typedValue = typedValueElement.value;
  const currentWord = words[wordIndex];

  if (typedValue === currentWord && wordIndex === words.length - 1) {
    typedValueElement.value = "";
    quoteElement.childNodes[wordIndex].className = "";
    wordIndex = 0;
    const elapsedTime = new Date().getTime() - startTime;
    const message = `CONGRATULATIONS! You finished in ${
      elapsedTime / 1000
    } seconds with ${errorCount} mistake(s)`;
    messageElement.innerText = message;
  } else if (typedValue.endsWith(" ") && typedValue.trim() === currentWord) {
    typedValueElement.value = "";
    wordIndex++;

    for (const wordElement of quoteElement.childNodes) {
      wordElement.className = "";
    }

    quoteElement.childNodes[wordIndex].className = "highlight";
  } else if (currentWord.startsWith(typedValue)) {
    // currently correct
    // highlight the next word
    typedValueElement.className = "";
  } else {
    // error state
    errorCount++;
    typedValueElement.className = "error";
  }
});

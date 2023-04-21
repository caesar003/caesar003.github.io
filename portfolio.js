const portfolios = document.querySelector(".portfolios");

const links = [
    {
        image: "single_carousel.jpg",
        title: "Single Page Carousel",
        link: "single_carousel",
        description:
            "Single page website which becomes more popular among modern web applications",
    },
    {
        image: "strapped.jpg",
        title: "Strapped",
        link: "strapped",
        description:
            "Multi pages profile website is a good option once you need to separate your content into different pages.",
    },
    {
        image: "pattern.jpg",
        title: "Pattern",
        link: "pattern",
        description:
            "An image gallery accompanied with catchy caption and description. ",
    },
    {
        image: "museum_of_candy.jpg",
        title: "Museum of Candy",
        link: "museum_of_candy",
        description:
            "Single page two-column website, for those who need several paragraphs but still want the images to stand out.",
    },
    {
        image: "landing_page1.jpg",
        title: "Landing Page",
        link: "landing_page",
        description:
            "The first impression you want visitors to see once they come across your site.",
    },
    // {
    //     image: "landing_page2.jpg",
    //     title: "Landing Page",
    //     link: "landing_page_2",
    //     description: "Another landing page",
    // },
    {
        image: "image_gallery.jpg",
        title: "Image Gallery",
        link: "image_gallery",
        description: "A perfect choice to display collection of your photos.",
    },
    {
        image: "carousel.png",
        title: "Carousel",
        link: "carousel",
        description:
            "Provide a compact view for bunch of your products and services in a single page. ",
    },
    // {
    //     image: "blog.jpg",
    //     title: "Blog post",
    //     link: "blog",
    //     description:
    //         "A simple blog post template which is worth considering for those who like writing and sharing ideas about particular subject such as food and travelling.",
    // },

    // {
    //     image: "library.png",
    //     title: "Library",
    //     link: "library",
    //     description: "A simple web app containing collection of books",
    // },
    {
        image: "musician.png",
        title: "I'm a Musician",
        link: "musician",
        description:
            "You probably need a place to put information about your upcoming concerts, recent events etc.",
    },
    {
        image: "hidden-search.png",
        title: "hidden search widget",
        link: "50-projects-50-days/05%20Day%204%20-%20Hidden%20Search%20Widget/",
    },
    {
        image: "image-slider.png",
        title: "background image slider",
        link: "50-projects-50-days/19%20Day%2018%20-%20Background%20Slider/",
    },
    {
        image: "progress-step.png",
        title: "progress steps",
        link: "50-projects-50-days/03%20Day%202%20-%20Progress%20Steps/",
    },
    {
        image: "split-landing-page.png",
        title: "split landing page",
        link: "50-projects-50-days/08%20Day%207%20-%20Split%20Landing%20Page/",
    },
    {
        image: "sticky-navbar.png",
        title: "sticky navbar",
        link: "50-projects-50-days/26%20Day%2025%20-%20Sticky%20Navbar/",
    },
    {
        image: "rotating-navbar.png",
        title: "rotating-navbar",
        link: "50-projects-50-days/04%20Day%203%20-%20Rotating%20Navigation/",
    },
    {
        image: "expanding-cards.png",
        title: "expanding cards",
        link: "50-projects-50-days/02%20Day%201%20-%20Expanding%20Cards/",
    }
];
const createCard = (obj) => {
    const card = document.createElement("div");
    card.classList.add("portfolio-card");
    card.style.backgroundImage = `url('./assets/img/${obj.image}')`;

    const link = document.createElement("a");
    link.href = obj.link;
    link.innerText = obj.title;

    card.appendChild(link);
    portfolios.appendChild(card);
};

for (let i = 0; i < links.length; i++) {
    createCard(links[i]);
}

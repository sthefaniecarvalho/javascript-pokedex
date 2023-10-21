
function getPokemon(pokeNumber) {
    const pokemonDetailsContainer = document.getElementById('pokemonDetails');
    
    const pokemon = {}
    pokemon.url = `https://pokeapi.co/api/v2/pokemon/${pokeNumber}/`
    pokeApiAbout.getPokemonDetail(pokemon)
      .then((pokeDetail) => {
        sessionStorage.setItem('pokemon', JSON.stringify(pokeDetail));
        
        // Exiba o modal  
        pokemonDetailsContainer.style.display = 'block';
        
        // Preencha os detalhes do Pokémon no modal
        fillPokemonDetails(pokeDetail);

        //Abrir a tab about
        openTab('aboutTab', pokeDetail);
      })
  }
  
  // Função para preencher os detalhes do Pokémon no modal

  function fillProfilePokeDetails(pokemonDetail) {
    return `
        <div class="profile-content">
        <div class="profile-bio ${pokemonDetail.type}">
            <img src="/assets/images/xmark-solid.svg" alt="x-marks" class="close" id="closeProfile" onclick="closeModal()">
            <span class="number">#${pokemonDetail.number}</span><br>
            
            <div class="detail">
                <span class="name">${pokemonDetail.name}</span> 
                <ol class="types">
                ${pokemonDetail.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                </ol>          
            </div>

            <div class="img-profile">
                <img src=${pokemonDetail.photo}
                    alt="balbasour">
            </div>
        </div>`
  }

  function fillHeaderPokeDetails() {
    return `<div class="profile-info">
    <div class="tab-header">
        <ul class="tabItems" id="openTab">
            <li class="tab-button active" onclick="openTab('aboutTab')" data-tab="aboutTab">About</li>
            <li class="tab-button" onclick="openTab('statsTab')" data-tab="statsTab">Base Stats</li>
            <li class="tab-button" onclick="openTab('evolutionTab')" data-tab="evolutionTab">Evolution</li>
            <li class="tab-button" onclick="openTab('movesTab')" data-tab="movesTab">Moves</li>
        </ul>
    </div>
    <div class="tab-content" id="aboutTab"></div>
    <div class="tab-content" id="statsTab"></div>
    <div class="tab-content" id="evolutionTab"></div>
    <div class="tab-content" id="movesTab"></div>`
  }

  function fillAboutPokeDetails(pokemon) {
    return `
        <div class="attribute-items">
            <ul>
                <li>Species</li>
                <li>Height</li>
                <li>Weight</li>
                <li>Abilities</li>
            </ul>

            <ul>
                <li>${pokemon.species.name}</li>
                <li>${pokemon.height}</li>
                <li>${pokemon.weight}</li>
                <li>${pokemon.abilities}</li>
            </ul>
        </div>
        <div class="breeding">
            <h3>Breeding</h3>
        </div>
        <div class="attribute-items">
            <ul>
                <li>Gender</li>
                <li>Egg Groups</li>
                <li>Egg Cycle</li>
            </ul>
            <ul>
                <li>
                <span class="icon-gender">
                    <img src="/assets/images/mars-solid.svg" alt="icon-mars"></span>
                    ${pokemon.gender.male}% 
                <span class="icon-gender">
                    <img src="/assets/images/venus-solid.svg" alt="icon-female"></span>
                ${pokemon.gender.female}%</li>
                <li>${pokemon.egg_groups}</li>
                <li>${pokemon.egg_cycle}</li>
            </ul>
        </div>
    `
  }

  function fillStatsPokeDetails(pokeDetail) { 

    let total_stat = 0;
    const statsList = pokeDetail.stats;

    const statsHtml = statsList.map((stat) => {
        total_stat += Number(stat.base_stat);

        return `
            <li class="stat">
                <span>${stat.stat.name}</span>
                <span>${stat.base_stat}</span>
            </li>
        `;
    }).join('');

    return `
        <div class="attribute-items">
            <ul>
                ${statsHtml}
                <li class="stat">
                    <span>Total</span>
                    <span>${total_stat}</span>
                </li>
            </ul>
        </div>
    `;
}

function fillEvolutionPokeDetails(pokeDetail) {
    return `Evolution`
}

function fillMovesPokeDetails(pokeDetail) {
    return `Moves`
}

  function fillPokemonDetails(pokeDetail) {
    const modalContent = document.getElementById('profile-content');
    modalContent.innerHTML = fillProfilePokeDetails(pokeDetail);
    modalContent.innerHTML += fillHeaderPokeDetails(pokeDetail); 
    
  }

  // Função para fechar o modal
  function closeModal() {
    const pokemonDetailsContainer = document.getElementById('pokemonDetails');
    pokemonDetailsContainer.style.display = 'none';
  }

  
  function openTab(tabId) {
    const tabContents = document.querySelectorAll('.tab-content');
    const tabButtons = document.querySelectorAll('.tab-button');
    const selectedTab  = document.getElementById(tabId);
    const selectedTabButton = document.querySelector(`[data-tab="${tabId}"]`);

    const pokeDetail = JSON.parse(sessionStorage.getItem('pokemon'));
  
    tabContents.forEach(tabContent => {
        tabContent.classList.remove('active');
    });

    tabButtons.forEach(tabButton => {
        tabButton.classList.remove('active');
    }) 

    selectedTab.classList.add('active');

    selectedTabButton.classList.add('active');


    switch (tabId) {
        case "aboutTab":
            const tabAboutContent = document.getElementById('aboutTab');
            tabAboutContent.innerHTML = fillAboutPokeDetails(pokeDetail);
            break;
        case "statsTab":
            const tabStatsContent = document.getElementById('statsTab');
            tabStatsContent.innerHTML = fillStatsPokeDetails(pokeDetail);
            break;
        case "evolutionTab":
            const tabEvolutionContent = document.getElementById('evolutionTab');
            tabEvolutionContent.innerHTML = fillEvolutionPokeDetails(pokeDetail);
            break;
        case "movesTab":
            const tabMovesContent = document.getElementById('movesTab');
            tabMovesContent.innerHTML = fillMovesPokeDetails(pokeDetail);
            break;
        default:
            break;
        }
    }




  
  
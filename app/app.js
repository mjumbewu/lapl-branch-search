let allLibraries = [];
let filteredLibraries = [];
let selectedDays = new Set();
let selectedAmenities = new Set();
let allAvailableAmenities = new Set();
let map;
let markerMap = new Map();

// Local Storage Helper for Visited Libraries
let visitedLibraries = {};

function loadVisitedLibraries() {
    try {
        const stored = localStorage.getItem('lapl_visited_libraries');
        visitedLibraries = stored ? JSON.parse(stored) : {};
    } catch (err) {
        console.error("Error loading visited libraries:", err);
        visitedLibraries = {};
    }
}

function saveVisitedLibraries() {
    try {
        localStorage.setItem('lapl_visited_libraries', JSON.stringify(visitedLibraries));
    } catch (err) {
        console.error("Error saving visited libraries:", err);
    }
}

function isLibraryVisited(name) {
    return !!visitedLibraries[name];
}

function markLibraryVisited(name, timestamp = new Date().toISOString()) {
    visitedLibraries[name] = { visitedAt: timestamp };
    saveVisitedLibraries();
}

function removeLibraryVisited(name) {
    delete visitedLibraries[name];
    saveVisitedLibraries();
}

const DOM = {
    loading: document.getElementById('loading'),
    noResults: document.getElementById('no-results'),
    list: document.getElementById('branch-list'),
    toggleFiltersBtn: document.getElementById('toggle-filters'),
    filterPanel: document.getElementById('filter-panel'),
    dayFilters: document.getElementById('day-filters'),
    amenityFilters: document.getElementById('amenity-filters'),
    visitedFilters: document.getElementById('visited-filters'),
    clearFiltersBtn: document.getElementById('clear-filters'),
    applyFiltersBtn: document.getElementById('apply-filters')
};

async function init() {
    loadVisitedLibraries();
    setupEventListeners();
    
    map = new maplibregl.Map({
        container: 'map',
        style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
        center: [-118.2437, 34.0522],
        zoom: 10
    });

    try {
        const response = await fetch('libraries.json');
        allLibraries = await response.json();
        
        // Extract all unique amenities
        allLibraries.forEach(lib => {
            if (lib.amenities) {
                lib.amenities.forEach(a => allAvailableAmenities.add(a));
            }
        });
        
        populateAmenityFilters();
        applyFilters();
        
    } catch (err) {
        console.error("Error loading libraries:", err);
        DOM.loading.textContent = "Failed to load branch data.";
    }
}

function setupEventListeners() {
    DOM.toggleFiltersBtn.addEventListener('click', () => {
        DOM.filterPanel.classList.toggle('hidden');
        DOM.toggleFiltersBtn.classList.toggle('active');
    });

    DOM.dayFilters.addEventListener('click', (e) => {
        if (e.target.classList.contains('pill')) {
            e.target.classList.toggle('selected');
        }
    });

    DOM.amenityFilters.addEventListener('click', (e) => {
        if (e.target.classList.contains('pill')) {
            e.target.classList.toggle('selected');
        }
    });

    DOM.visitedFilters.addEventListener('click', (e) => {
        if (e.target.classList.contains('pill')) {
            const isSelected = e.target.classList.contains('selected');
            DOM.visitedFilters.querySelectorAll('.pill').forEach(el => el.classList.remove('selected'));
            if (!isSelected) {
                e.target.classList.add('selected');
            }
        }
    });

    DOM.clearFiltersBtn.addEventListener('click', () => {
        document.querySelectorAll('.pill.selected').forEach(el => el.classList.remove('selected'));
        applyFilters();
    });

    DOM.applyFiltersBtn.addEventListener('click', () => {
        DOM.filterPanel.classList.add('hidden');
        DOM.toggleFiltersBtn.classList.remove('active');
        applyFilters();
    });

    // Event delegation for dynamically rendered branch list elements
    DOM.list.addEventListener('change', (e) => {
        if (e.target.classList.contains('visited-checkbox')) {
            const libName = e.target.dataset.libName;
            const checked = e.target.checked;
            if (checked) {
                markLibraryVisited(libName);
                applyFilters();
            } else {
                const confirmClear = confirm(`Are you sure you want to remove the visitation record for ${libName}?`);
                if (confirmClear) {
                    removeLibraryVisited(libName);
                    applyFilters();
                } else {
                    e.target.checked = true;
                }
            }
        }
    });

    DOM.list.addEventListener('click', (e) => {
        const editBtn = e.target.closest('.edit-visit-btn');
        if (editBtn) {
            const libName = editBtn.dataset.libName;
            const card = document.getElementById(`branch-card-${libName.replace(/\W+/g, '-')}`);
            if (card) {
                const form = card.querySelector('.edit-visit-form');
                if (form) {
                    form.classList.toggle('hidden');
                }
            }
            return;
        }

        const saveBtn = e.target.closest('.save-visit-btn');
        if (saveBtn) {
            const form = saveBtn.closest('.edit-visit-form');
            const libName = form.dataset.libName;
            const input = form.querySelector('.edit-visit-input');
            if (input && input.value) {
                const dateVal = new Date(input.value);
                if (!isNaN(dateVal.getTime())) {
                    markLibraryVisited(libName, dateVal.toISOString());
                    applyFilters();
                } else {
                    alert("Please enter a valid date and time.");
                }
            }
            return;
        }

        const cancelBtn = e.target.closest('.cancel-visit-btn');
        if (cancelBtn) {
            const form = cancelBtn.closest('.edit-visit-form');
            form.classList.add('hidden');
            const isVisited = isLibraryVisited(form.dataset.libName);
            if (isVisited) {
                const visitedAt = visitedLibraries[form.dataset.libName].visitedAt;
                const dateObj = new Date(visitedAt);
                const year = dateObj.getFullYear();
                const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                const day = String(dateObj.getDate()).padStart(2, '0');
                const hours = String(dateObj.getHours()).padStart(2, '0');
                const minutes = String(dateObj.getMinutes()).padStart(2, '0');
                const input = form.querySelector('.edit-visit-input');
                if (input) {
                    input.value = `${year}-${month}-${day}T${hours}:${minutes}`;
                }
            }
            return;
        }
    });
}

function populateAmenityFilters() {
    const sorted = Array.from(allAvailableAmenities).sort();
    sorted.forEach(amenity => {
        const btn = document.createElement('button');
        btn.className = 'pill';
        btn.dataset.amenity = amenity;
        btn.textContent = amenity;
        DOM.amenityFilters.appendChild(btn);
    });
}

function applyFilters() {
    // Gather selected
    selectedDays.clear();
    document.querySelectorAll('#day-filters .pill.selected').forEach(el => {
        selectedDays.add(el.dataset.day);
    });

    selectedAmenities.clear();
    document.querySelectorAll('#amenity-filters .pill.selected').forEach(el => {
        selectedAmenities.add(el.dataset.amenity);
    });

    const selectedVisitedEl = document.querySelector('#visited-filters .pill.selected');
    const selectedVisited = selectedVisitedEl ? selectedVisitedEl.dataset.visited : null;

    filteredLibraries = allLibraries.filter(lib => {
        // Filter by days open
        if (selectedDays.size > 0) {
            let isOpenOnAllSelectedDays = true;
            for (const day of selectedDays) {
                if (!lib.hours || !lib.hours[day] || lib.hours[day].toLowerCase().includes('closed')) {
                    isOpenOnAllSelectedDays = false;
                    break;
                }
            }
            if (!isOpenOnAllSelectedDays) return false;
        }

        // Filter by amenities
        if (selectedAmenities.size > 0) {
            if (!lib.amenities) return false;
            let hasAllAmenities = true;
            for (const am of selectedAmenities) {
                if (!lib.amenities.includes(am)) {
                    hasAllAmenities = false;
                    break;
                }
            }
            if (!hasAllAmenities) return false;
        }

        // Filter by visited status
        if (selectedVisited) {
            const visited = isLibraryVisited(lib.name);
            if (selectedVisited === 'visited' && !visited) return false;
            if (selectedVisited === 'unvisited' && visited) return false;
        }

        return true;
    });

    renderList();
    renderMapMarkers();
}

function renderMapMarkers() {
    markerMap.forEach(m => m.remove());
    markerMap.clear();

    filteredLibraries.forEach(lib => {
        if (lib.lat && lib.lng) {
            const popup = new maplibregl.Popup({ offset: 25 })
                .setText(lib.name);
                
            let marker;
            const isVisited = isLibraryVisited(lib.name);
            if (isVisited) {
                const el = document.createElement('div');
                el.className = 'marker-visited';
                el.textContent = '🌟';
                marker = new maplibregl.Marker({ element: el })
                    .setLngLat([lib.lng, lib.lat])
                    .setPopup(popup)
                    .addTo(map);
            } else {
                marker = new maplibregl.Marker()
                    .setLngLat([lib.lng, lib.lat])
                    .setPopup(popup)
                    .addTo(map);
            }
                
            marker.getElement().addEventListener('click', () => {
                const li = document.getElementById(`branch-card-${lib.name.replace(/\W+/g, '-')}`);
                if (li) {
                    li.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    li.classList.remove('highlight-flash');
                    void li.offsetWidth; // trigger reflow
                    li.classList.add('highlight-flash');
                }
            });
                
            markerMap.set(lib.name, marker);
        }
    });
}

function getTodayStr() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[new Date().getDay()];
}

function renderList() {
    DOM.loading.classList.add('hidden');
    DOM.list.innerHTML = '';
    
    if (filteredLibraries.length === 0) {
        DOM.noResults.classList.remove('hidden');
        return;
    }
    
    DOM.noResults.classList.add('hidden');
    
    const today = getTodayStr();

    filteredLibraries.forEach(lib => {
        const li = document.createElement('li');
        li.className = 'branch-card';
        li.id = `branch-card-${lib.name.replace(/\W+/g, '-')}`;
        
        li.addEventListener('click', (e) => {
            if (e.target.closest('.branch-address') || e.target.closest('.visited-section')) return;
            
            if (lib.lat && lib.lng) {
                map.flyTo({ center: [lib.lng, lib.lat], zoom: 14 });
                const marker = markerMap.get(lib.name);
                if (marker && !marker.getPopup().isOpen()) {
                    marker.togglePopup();
                }
            }
        });
        
        let hoursHtml = '';
        if (lib.hours) {
            const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            hoursHtml = `<div class="hours-grid">` + 
                days.map(d => lib.hours[d] ? `<div class="hour-item"><span class="day">${d}</span> <span>${lib.hours[d]}</span></div>` : '').join('') +
            `</div>`;
        }

        let amenitiesHtml = '';
        if (lib.amenities && lib.amenities.length > 0) {
            amenitiesHtml = `<div class="branch-amenities">` + 
                lib.amenities.map(a => `<span class="amenity-tag">${a}</span>`).join('') +
            `</div>`;
        }

        // basic open/closed status for today
        const todaysHours = lib.hours ? lib.hours[today] : null;
        const isClosed = !todaysHours || todaysHours.toLowerCase().includes('closed');
        const statusClass = isClosed ? 'status-closed' : 'status-open';
        const statusText = isClosed ? 'Closed Today' : 'Open Today';

        const isVisited = isLibraryVisited(lib.name);
        if (isVisited) {
            li.classList.add('card-visited');
        }
        let formattedDate = '';
        let localIsoString = '';
        if (isVisited) {
            const visitedAt = visitedLibraries[lib.name].visitedAt;
            const dateObj = new Date(visitedAt);
            formattedDate = dateObj.toLocaleString([], {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const day = String(dateObj.getDate()).padStart(2, '0');
            const hours = String(dateObj.getHours()).padStart(2, '0');
            const minutes = String(dateObj.getMinutes()).padStart(2, '0');
            localIsoString = `${year}-${month}-${day}T${hours}:${minutes}`;
        }

        li.innerHTML = `
            <div class="branch-header">
                <h2 class="branch-name">${lib.name}</h2>
                <span class="branch-status ${statusClass}">${statusText}</span>
            </div>
            <p class="branch-address">${lib.address}</p>
            ${hoursHtml ? `<div class="branch-hours">${hoursHtml}</div>` : ''}
            ${amenitiesHtml}
            <div class="visited-section">
                <div class="visited-row">
                    <label class="visited-toggle">
                        <input type="checkbox" class="visited-checkbox" data-lib-name="${lib.name}" ${isVisited ? 'checked' : ''}>
                        <span class="visited-label">Visited</span>
                    </label>
                    ${isVisited ? `
                    <div class="visitation-info">
                        <span class="visited-date">on ${formattedDate}</span>
                        <button class="edit-visit-btn icon-button" data-lib-name="${lib.name}" aria-label="Edit visit date">✏️</button>
                    </div>
                    ` : ''}
                </div>
                ${isVisited ? `
                <div class="edit-visit-form hidden" data-lib-name="${lib.name}">
                    <input type="datetime-local" class="edit-visit-input" value="${localIsoString}">
                    <div class="edit-visit-actions">
                        <button class="save-visit-btn primary-btn small-btn">Save</button>
                        <button class="cancel-visit-btn secondary-btn small-btn">Cancel</button>
                    </div>
                </div>
                ` : ''}
            </div>
        `;
        
        DOM.list.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', init);

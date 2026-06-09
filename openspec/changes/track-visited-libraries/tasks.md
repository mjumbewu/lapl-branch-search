## 1. Storage Implementation

- [x] 1.1 Create local storage utility functions in `app/app.js` to load, save, check, and edit visited libraries data using the key `lapl_visited_libraries`

## 2. UI Updates & Styling

- [x] 2.1 Update the branch card template in `app/app.js` inside `renderList()` to include the "Visited" toggle checkbox, status label, visitation timestamp, and inline edit controls
- [ ] 2.2 Add CSS rules in `app/style.css` for styling the visited toggle, timestamp, edit pencil icon, and inline datetime input and action buttons
- [ ] 2.3 Update the filter panel in `app/index.html` to add the "Visited Status" filter group containing "Visited" and "Not Visited" pills

## 3. Interaction & Events

- [ ] 3.1 Implement checkbox change handler in `app/app.js` to mark a library as visited (saving current date/time)
- [ ] 3.2 Implement confirmation dialog logic on checkbox change when unchecking a visited library
- [ ] 3.3 Implement inline editor toggling and timestamp population when clicking the pencil emoji (✏️)
- [ ] 3.4 Implement "Save" and "Cancel" handlers for the inline editor to persist new timestamps or revert changes
- [ ] 3.5 Implement visited status pill selection and toggling in `app/app.js`, ensuring the "Visited" and "Not Visited" pills are mutually exclusive
- [ ] 3.6 Update the `applyFilters()` function in `app/app.js` to filter the branch list and map markers based on the selected visited status

## 4. Verification

- [ ] 4.1 Verify that marking a library as visited saves the correct timestamp and state to local storage
- [ ] 4.2 Verify that unchecking a visited library prompts for confirmation, preserving state on cancel and deleting it on confirm
- [ ] 4.3 Verify that editing the date/time via the pencil emoji updates the saved timestamp and card UI correctly
- [ ] 4.4 Verify that selecting the "Visited" or "Not Visited" filter correctly filters both the list and map markers, and that clearing filters restores the full list

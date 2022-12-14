import { createSlice } from "@reduxjs/toolkit"
import { CatalogueEntry, DataFilters } from "../types"

interface DataState {
    data: CatalogueEntry[],
    filter: DataFilters,
    price: number[],
    search: string,
    sort: string
}

const initialFilters: DataFilters = {
    Brand: [],
    Size: [],
    Material: [],
}

const initialState: DataState = { data: [], filter: initialFilters, price: [], search: '', sort: '' }
const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        addData(state: DataState, action: { payload: CatalogueEntry[] }) {
            state.data = [...action.payload]
            const max = Math.max(...action.payload.map(el => el.price))
            const min = Math.min(...action.payload.map(el => el.price))
            state.price = [min, max]
        },
        addFilter(state: DataState, action: { payload: { containName: string, propertyName: string } }) {
            if (!state.filter[action.payload.propertyName as keyof DataFilters].includes(action.payload.containName)) {
                state.filter[action.payload.propertyName as keyof DataFilters].push(action.payload.containName)
            }
            else {
                state.filter[action.payload.propertyName as keyof DataFilters].splice(state.filter[action.payload.propertyName as keyof DataFilters].indexOf(action.payload.containName), 1)
            }
        },
        addPrice(state: DataState, action: { payload: number[] }) {
            state.price = [...action.payload]
        },
        filterShift(state: DataState) {
            state.filter = initialFilters
            state.price = [Math.min(...state.data.map(el => el.price)), Math.max(...state.data.map(el => el.price))]

        },
        searchTitleReducer(state: DataState, action: { payload: string }) {
            state.search = action.payload
        },
        clearDataSlice(state: DataState) {
            state.filter = initialFilters,
                state.sort = '',
                state.price = [Math.min(...state.data.map(el => el.price)), Math.max(...state.data.map(el => el.price))],
                state.search = '',
                state.data.length = 0
        }
    }
})

export const { addData, addFilter, addPrice, filterShift, searchTitleReducer, clearDataSlice } = dataSlice.actions
export default dataSlice.reducer

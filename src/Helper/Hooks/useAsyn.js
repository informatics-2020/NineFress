import {useRef, useCallback, useReducer} from 'react';
import useSafeDispatch from './useSafeDispatch';

const defaultState = {
    data: null,
    status: "idle",
    error: null
}
export default function useAsnyc(initialState) {

    const initiaStateRef = useRef({
        ...defaultState, 
        ...initialState
    });


    const [{ data, status, error }, setState] = useReducer((state, action) => {
        return {...state, ...action}
    }, initiaStateRef.current)

    console.log(initiaStateRef.current);

    const safeSetState = useSafeDispatch(setState);

    const run = useCallback((promise) => {

        safeSetState({status: "pending",});
        return promise.then((data) => {
            safeSetState({data, status: "resolved"});
            return data;
        },
            (error) => {    
                safeSetState({
                    status: "rejected", 
                    error: "Data not Found"
                });
            }
        );
    },[safeSetState]);

    const setData = useCallback((data) => {
        safeSetState({data});
    },
        [safeSetState],
    )

    const setError = useCallback((error) => {
        safeSetState({error});
    },
        [safeSetState],
    )

    const reset = useCallback(() => {
        safeSetState(initiaStateRef.current);
    },
        [safeSetState],
    )

    return {
        data, 
        status, 
        error, 
        run,
        setData,
        setError,
        reset,
        isIdle: status === "idle",
        isLoading: status === "idle" || status === "pending",
        isError: status === "rejected",
        isSuccess: status === "resolved"
    }
}

import { UPLOAD_IMAGE, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAILURE, RESET_UPLOAD_IMAGE } from '../actions/imageUploadActions';

const INITIAL_STATE = { file: null, loading: false };

export default function (state = INITIAL_STATE, action) {
	let error;
	switch (action.type ) {
		case UPLOAD_IMAGE:
				console.log(action.payload);
			return { ...state, file: action.payload, error: null, loading: false };
		case UPLOAD_IMAGE_SUCCESS:
			return { ...state, error: null, loading: false};
		case UPLOAD_IMAGE_FAILURE:
			return { ...state, error: error, loading: false};
		case RESET_UPLOAD_IMAGE:
			return { ...state, error: null, loading: false};
		default:
			return state;
	}
}
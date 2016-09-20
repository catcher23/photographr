import axios from 'axios';

export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_FAILURE = 'UPLOAD_IMAGE_FAILURE';
export const RESET_UPLOAD_IMAGE = 'RESET_UPLOAD_IMAGE';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

export function uploadImage(imageData) {
	const request = axios({
		method: 'post',
		data: imageData,
		url: `${ROOT_URL}/images`
	});

	return {
		type: UPLOAD_IMAGE,
		payload: request
	}
}

export function uploadImageSuccess(image_url) {
	return {
		type: UPLOAD_IMAGE_SUCCESS,
		payload: image_url
	};
}

export function uploadImageFailure(error) {
	return {
		type: UPLOAD_IMAGE_FAILURE,
		payload: error
	};
}

export function resetUploadImage() {
	return {
		type: RESET_UPLOAD_IMAGE
	}
}
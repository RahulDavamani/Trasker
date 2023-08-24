import { applyAction, deserialize } from '$app/forms';
import { invalidateAll, invalidate } from '$app/navigation';
import type { ActionResult } from '@sveltejs/kit';

interface TriggerActionOptions<T> {
	invalidateUrl?: string | null;
	onMutate?: (action: string, data?: T) => void | Promise<void>;
	onSuccess?: (response: Response, result: ActionResult) => void | Promise<void>;
	onError?: (response: Response, result: ActionResult) => void | Promise<void>;
	onComplete?: (response: Response, result: ActionResult) => void | Promise<void>;
}

export const triggerAction = async <T extends Record<string, unknown>>(
	action: string,
	data?: T,
	{ invalidateUrl, onMutate, onSuccess, onError, onComplete }: TriggerActionOptions<T> = {}
) => {
	onMutate && (await onMutate(action, data));
	const response = await fetch(action, {
		method: 'POST',
		body: objectToFormData(data)
	});

	const result: ActionResult = deserialize(await response.text());
	if (result.type === 'success') {
		onSuccess && (await onSuccess(response, result));
		if (invalidateUrl === undefined) invalidateAll();
		else if (invalidateUrl) await invalidate(invalidateUrl);
	} else if (result.type === 'error' || result.type === 'failure') onError && (await onError(response, result));

	applyAction(result);
	onComplete && (await onComplete(response, result));
};

const objectToFormData = (data?: Record<string, unknown>, formData = new FormData(), parentKey = ''): FormData => {
	for (const key in data) {
		if (Object.prototype.hasOwnProperty.call(data, key)) {
			const nestedKey = parentKey ? `${parentKey}[${key}]` : key;
			const value = data[key];

			if (value)
				if (typeof value === 'object') {
					objectToFormData(value as Record<string, unknown>, formData, nestedKey);
				} else {
					formData.append(nestedKey, value as string);
				}
		}
	}
	return formData;
};

export const sellRequestCreate = (data: {
  property_form: InitialState;
  unregistered_user: {
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
  };
}) =>
  request(Methods.POST, {
    url: `/requests/sales`,
    data,
    headers: { 'Content-Type': 'application/json', 'X-Api-Version': '1.0' },
  });

export const sellRequestFormData = (data: {
  payload: FormData;
  requestId: number;
}) => {
  return request(Methods.PUT, {
    url: `/requests/sales/${data.requestId}`,
    data: data.payload,
    headers: { 'Content-Type': 'multipart/form-data', 'X-Api-Version': '1.0' },
  });
};

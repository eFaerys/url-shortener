import { useState, type FC } from 'react';
import { Button, Col, Form, InputGroup, Modal } from 'react-bootstrap';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { shortenUrl } from '../services/url/call';
import type { UrlResponse } from '../services/url/types';

type LongUrl = {
	longUrl: string;
};



const CreateUrl: FC = () => {
	const { register, handleSubmit, reset } = useForm<LongUrl>();
	const [showModal, setShowModal] = useState<boolean>(false);
	const [shortUrl, setShortUrl] = useState<UrlResponse>({url: '', resquestAccess: 0});

	const onSubmit: SubmitHandler<LongUrl> = async (data) => {
		shortenUrl(data.longUrl).then((newLink) => {
			setShortUrl({url: newLink.url, resquestAccess: newLink.resquestAccess});
			setShowModal(true);
			reset();
		}).catch((e) => {
			console.log(e)
		});
	};

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(shortUrl.url);
			alert('Link clipped');
		} catch {
			alert('Unable to clip the link');
		}
	};

	return (
		<div className="d-flex flex-column align-items-center">
			<Col xs={12} md={8} lg={6}>
				<h1 className="mb-4 text-center">URL Shorter</h1>

				<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Group controlId="urlInput" className="mb-3">
						<Form.Label>Enter your URL</Form.Label>
						<Form.Control type="url" placeholder="https://medium.com/equify-tech/the-three-fundamental-stages-of-an-engineering-career-54dac732fc74" {...register('longUrl', { required: true })} />
					</Form.Group>

					<div className="d-grid">
						<Button type="submit" variant="primary">
							Short It
						</Button>
					</div>
				</Form>

				<Modal variant="secondary" show={showModal} onHide={() => setShowModal(false)} centered>
					<Modal.Header closeButton>
						<Modal.Title>
							Your shortened link redirect: {shortUrl.resquestAccess} hacker(s)
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<InputGroup>
							<Form.Control value={shortUrl.url} readOnly />
							<Button variant="outline-secondary" onClick={handleCopy}>
								Copy
							</Button>
						</InputGroup>
					</Modal.Body>
					<Modal.Footer>
						<Button variant='primary' onClick={() => window.open(shortUrl.url)}>
							Go To Link
						</Button>
						<Button variant="secondary" onClick={() => setShowModal(false)}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</Col>
		</div>
	);
};

export default CreateUrl;
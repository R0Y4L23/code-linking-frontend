import { useCallback, useEffect, useState } from 'react';
import 'quill/dist/quill.snow.css';
import Quill from 'quill';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const TextEditor = ({ email, auth }) => {

    const [socket, setSocket] = useState();
    const { id: documentId } = useParams();
    const [socketEmail, setSocketEmail] = useState('');

    // Setting up the connection to server
    useEffect(() => {
        const s = io('http://localhost:8000');
        setSocket(s);
        return () => {
            s.disconnect();
        };
    }, []);

    // capturing the changes and sending it to the server
    useEffect(() => {
        if (socket == null || quill == null || (email !== socketEmail && auth.user.email !== socketEmail)) return;
        const handler = (delta, oldDelta, source) => {
            if (source !== 'user') return;
            socket.emit('send-changes', delta);
        };
        quill.on('text-change', handler);

        return () => {
            quill.off('text-change', handler);
        };
    }, [socket, quill, socketEmail, email]);

    // update content with the changes made
    useEffect(() => {
        if (socket == null || quill == null) return;
        const handler = (delta) => {
            quill.updateContents(delta);
        };
        socket.on('receive-changes', handler);

        return () => {
            socket.off('receive-changes', handler);
        };
    }, [socket, quill]);

    useEffect(() => {
        if (socket == null || quill == null) return;

        socket.once('load-document', (document, doccumentemail) => {
            quill.setContents(document);
            quill.enable();
            setSocketEmail(doccumentemail);
        });
        socket.emit('get-document', documentId, auth.user.email);
    }, [socket, quill, documentId, auth.user.email]);

    useEffect(() => {
        if (email !== socketEmail && auth.user.email !== socketEmail) return;
        const interval = setInterval(() => {
            socket.emit('save-doc', quill.getContents());
        }, 2000);

        return () => {
            clearInterval(interval);
        };
    }, [socket, quill, socketEmail, email]);

    const WrapperRef = useCallback((wrapper) => {
        if (wrapper === null) return;
        wrapper.innerHTML = '';
        const editor = document.createElement('div');
        wrapper.append(editor);
        const q = new Quill(editor, {
            theme: 'snow',
            modules: { toolbar: TOOLBAR_OPTIONS },
        });
        q.disable();
        q.setText('Loading Nirmalya Doc Clone....');
        setQuill(q);
    }, []);
    return <div className='container' ref={WrapperRef}></div>

}

TextEditor.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(TextEditor);
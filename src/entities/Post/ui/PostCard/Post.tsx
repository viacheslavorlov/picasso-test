import {useWindowSize} from '@/shared/hooks/useWindowSize';
import {classNames} from '@/shared/lib/classNames/classNames';
import {HStack} from '@/shared/ui/Stack';
import {AppLink} from '@/shared/ui/AppLink';
import {VStack} from '@/shared/ui/Stack/index.js';
import {IPost} from '../../model/type';
import cls from './Post.module.css';
import {memo, useLayoutEffect, useRef, useState} from 'react';

interface PostProps {
    className?: string;
    post: IPost;
}

export const Post = memo((props: PostProps) => {
    const {
        className, post
    } = props;
    const [body, setBody] = useState(post.body);
    const postBody = useRef<HTMLDivElement | null>(null);
    const [width] = useWindowSize();

    useLayoutEffect(() => {
        const postBodyLength = (postBody.current?.offsetWidth || width * 0.8) / 8;
        setBody(post.body.length > postBodyLength ? post.body.slice(0, postBodyLength) + '...' : post.body);
    }, [post.body, width]);

    return (
        <HStack className={classNames(cls.Post, className)}>
            <div className={cls.id}>{post.id}.</div>
            <VStack max>
                <div className={cls.title}>{post.title}</div>
                <div ref={postBody} className={cls.body}>{body}</div>
            </VStack>

            <AppLink className={cls.btn} to={`/post/${post.id}`} title={'Просмотр'}/>
        </HStack>
    );
});

import {Link} from 'react-router-dom';
import {classNames} from '../../../shared/lib/classNames/classNames';
import {HStack} from '../../../shared/ui/Stack';
import {IPost} from '../model/type';
import cls from './Post.module.css';
import {memo} from 'react';

interface PostProps {
    className?: string;
    post: IPost;
}

export const Post = memo((props: PostProps) => {
    const {
        className, post
    } = props;

    const title = post.title.length > 35 ? post.title.slice(0, 35) + '...' : post.title ;

    return (
        <HStack className={classNames(cls.Post, className)}>
            <div className={cls.id}>{post.id}.</div>
            <div className={cls.title}>{title}</div>
            <Link className={cls.btn} to={`/post/${post.id}`}>Просмотр</Link>
        </HStack>
    );
});

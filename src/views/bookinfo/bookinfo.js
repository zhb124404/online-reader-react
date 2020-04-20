/*
 * @Author: ZhuQiMing
 * @CreateTime: 2020/4/19 22:51
 */
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Button, Row, Col } from 'antd';
import { bookInfo, bookSources, bookCatalog } from '../../axios/api';

class Bookinfo extends Component {
    constructor (props) {
        super(props);
        this.state = {
            bookLink: [],
            staticsLink: '',
            mybookData: [],
            sourceId: '',
            sourceName: '',
            lastChapter: '',
            formSources: {
                sources: '',
                lastChapter: ''
            },
            sourcesData: [],
            catalogList: []
        };
    }

    componentDidMount () {
        // 获取小说信息
        bookInfo(this.props.match.params.id).then(res => {
            this.setState({
                bookLink: res,
                staticsLink: `http://statics.zhuishushenqi.com${res.cover}`
            });
        });
        // 获取小说正版源于盗版源(混合)
        this.getBookSources();
    }

    // 获取小说正版源于盗版源(混合)
    getBookSources () {
        let parmas = {
            view: 'summary',
            book: this.props.match.params.id
        };
        bookSources(parmas).then(res => {
            this.setState({
                sourceId: res[0]._id,
                sourceName: res[0].name,
                lastChapter: res[0].lastChapter,
                formSources: {
                    sources: res[0].name,
                    lastChapter: res[0].lastChapter
                },
                sourcesData: res
            }, () => {
                this.getCatalog();
            });
        });
    }

    // 获取小说章节(根据小说源id)
    getCatalog () {
        let parmas = this.state.sourceId;
        bookCatalog(parmas).then(res => {
            this.setState({
                catalogList: res.chapters
            });
        });
    }

    render () {
        return (
            <Fragment>
                <Breadcrumb separator=">" className="ptb-10">
                    <Breadcrumb.Item>
                        <Link to="/home">首页</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/category/male">{this.state.bookLink.cat}</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>{this.state.bookLink.title}</Breadcrumb.Item>
                </Breadcrumb>
                <div className="bookinfo-content">
                    <img src={this.state.staticsLink} alt={this.state.bookLink.title} className="img"/>
                    <div className="right-content">
                        <div className="content-data">
                            <div className="data-info">
                                <p>{this.state.bookLink.title}</p>
                                <p>作者：{this.state.bookLink.author}</p>
                                <p>
                                    类型：{this.state.bookLink.majorCate} |
                                    字数：{(this.state.bookLink.wordCount / 10000).toFixed(0)}
                                    万字</p>
                                <p>最后更新：{this.state.bookLink.updated}</p>
                                <p>最新章节：{this.state.lastChapter}</p>
                                <p>当前小说源：{this.state.sourceName}</p>
                            </div>
                            <div className="mt-20">
                                <Button type="primary">加入书架</Button>
                                <Button type="primary" className="ml-15">开始阅读</Button>
                                <Button type="primary" className="ml-15">更换小说源</Button>
                            </div>
                        </div>
                        <p className="long-intro">{this.state.bookLink.longIntro}</p>
                    </div>
                </div>
                <div className="popularity-content">
                    <Row>
                        <Col span={8}>
                            <p>追书人数</p>
                            <p className="popularity-p">{this.state.bookLink.latelyFollower}</p>
                        </Col>
                        <Col span={8}>
                            <p>读者存留率</p>
                            <p className="popularity-p">{this.state.bookLink.retentionRatio}%</p>
                        </Col>
                        <Col span={8}>
                            <p>日更新字数</p>
                            <p className="popularity-p">{this.state.bookLink.serializeWordCount}字</p>
                        </Col>
                    </Row>
                </div>
                <div className="catalog-content">
                    <p className="catalog-p">
                        目录
                        <span className="text-danger">（红色字体的为VIP章节）</span>
                    </p>
                    <div style={{padding: "0px 10px"}}>
                        {
                            this.state.catalogList.map((value, index) => (
                                <li className="chapter-li" key={value._id}>
                                    <span className={value.isVip?"text-danger":""}>{value.title}</span>
                                </li>
                            ))
                        }
                    </div>
                    <div style={{clear: "both"}}></div>
                </div>
            </Fragment>
        );
    }
}

export default Bookinfo;
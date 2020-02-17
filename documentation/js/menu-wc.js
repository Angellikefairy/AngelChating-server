'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest-first-program documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="请输入查询关键字"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>入门指南</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>概述
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>手册
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>依赖项
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">模块列表</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-37a787eed4232f5a31278f0077d33a38"' : 'data-target="#xs-injectables-links-module-AuthModule-37a787eed4232f5a31278f0077d33a38"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>可注入的</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-37a787eed4232f5a31278f0077d33a38"' :
                                        'id="xs-injectables-links-module-AuthModule-37a787eed4232f5a31278f0077d33a38"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ConnectionModule.html" data-type="entity-link">ConnectionModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginModule.html" data-type="entity-link">LoginModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-LoginModule-9de01aeb773355eb0fec169145f5a8d8"' : 'data-target="#xs-controllers-links-module-LoginModule-9de01aeb773355eb0fec169145f5a8d8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LoginModule-9de01aeb773355eb0fec169145f5a8d8"' :
                                            'id="xs-controllers-links-module-LoginModule-9de01aeb773355eb0fec169145f5a8d8"' }>
                                            <li class="link">
                                                <a href="controllers/LoginController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LoginModule-9de01aeb773355eb0fec169145f5a8d8"' : 'data-target="#xs-injectables-links-module-LoginModule-9de01aeb773355eb0fec169145f5a8d8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>可注入的</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LoginModule-9de01aeb773355eb0fec169145f5a8d8"' :
                                        'id="xs-injectables-links-module-LoginModule-9de01aeb773355eb0fec169145f5a8d8"' }>
                                        <li class="link">
                                            <a href="injectables/LoginService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LoginService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ModelsModule.html" data-type="entity-link">ModelsModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ModelsModule-4a16ff6e7f6dd93fbef0733149ebf59c"' : 'data-target="#xs-injectables-links-module-ModelsModule-4a16ff6e7f6dd93fbef0733149ebf59c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>可注入的</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ModelsModule-4a16ff6e7f6dd93fbef0733149ebf59c"' :
                                        'id="xs-injectables-links-module-ModelsModule-4a16ff6e7f6dd93fbef0733149ebf59c"' }>
                                        <li class="link">
                                            <a href="injectables/ExpressionService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ExpressionService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GroupRelationshipService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>GroupRelationshipService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GroupService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>GroupService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PreferSettingService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PreferSettingService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RandomAvatarsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RandomAvatarsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SocketService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SocketService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RegisterModule.html" data-type="entity-link">RegisterModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-RegisterModule-2a0681134a376b55d0c3e08f3d5f8527"' : 'data-target="#xs-controllers-links-module-RegisterModule-2a0681134a376b55d0c3e08f3d5f8527"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RegisterModule-2a0681134a376b55d0c3e08f3d5f8527"' :
                                            'id="xs-controllers-links-module-RegisterModule-2a0681134a376b55d0c3e08f3d5f8527"' }>
                                            <li class="link">
                                                <a href="controllers/RegisterController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RegisterModule-2a0681134a376b55d0c3e08f3d5f8527"' : 'data-target="#xs-injectables-links-module-RegisterModule-2a0681134a376b55d0c3e08f3d5f8527"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>可注入的</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RegisterModule-2a0681134a376b55d0c3e08f3d5f8527"' :
                                        'id="xs-injectables-links-module-RegisterModule-2a0681134a376b55d0c3e08f3d5f8527"' }>
                                        <li class="link">
                                            <a href="injectables/RegisterService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RegisterService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SocketModule.html" data-type="entity-link">SocketModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SocketModule-4cc547ad85b71425d0b3c3acd31ea541"' : 'data-target="#xs-injectables-links-module-SocketModule-4cc547ad85b71425d0b3c3acd31ea541"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>可注入的</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SocketModule-4cc547ad85b71425d0b3c3acd31ea541"' :
                                        'id="xs-injectables-links-module-SocketModule-4cc547ad85b71425d0b3c3acd31ea541"' }>
                                        <li class="link">
                                            <a href="injectables/WebsocketService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>WebsocketService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/LoginController.html" data-type="entity-link">LoginController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RegisterController.html" data-type="entity-link">RegisterController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>类列表</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Expression.html" data-type="entity-link">Expression</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExpressionCollection.html" data-type="entity-link">ExpressionCollection</a>
                            </li>
                            <li class="link">
                                <a href="classes/Friendship.html" data-type="entity-link">Friendship</a>
                            </li>
                            <li class="link">
                                <a href="classes/Group.html" data-type="entity-link">Group</a>
                            </li>
                            <li class="link">
                                <a href="classes/GroupRelationship.html" data-type="entity-link">GroupRelationship</a>
                            </li>
                            <li class="link">
                                <a href="classes/Message.html" data-type="entity-link">Message</a>
                            </li>
                            <li class="link">
                                <a href="classes/PreferSetting.html" data-type="entity-link">PreferSetting</a>
                            </li>
                            <li class="link">
                                <a href="classes/RandomAvatars.html" data-type="entity-link">RandomAvatars</a>
                            </li>
                            <li class="link">
                                <a href="classes/Socket.html" data-type="entity-link">Socket</a>
                            </li>
                            <li class="link">
                                <a href="classes/Theme.html" data-type="entity-link">Theme</a>
                            </li>
                            <li class="link">
                                <a href="classes/ThemeType.html" data-type="entity-link">ThemeType</a>
                            </li>
                            <li class="link">
                                <a href="classes/Tone.html" data-type="entity-link">Tone</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>可注入的</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExpressionService.html" data-type="entity-link">ExpressionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GroupRelationshipService.html" data-type="entity-link">GroupRelationshipService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GroupService.html" data-type="entity-link">GroupService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoginService.html" data-type="entity-link">LoginService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PreferSettingService.html" data-type="entity-link">PreferSettingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RandomAvatarsService.html" data-type="entity-link">RandomAvatarsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RegisterService.html" data-type="entity-link">RegisterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SocketService.html" data-type="entity-link">SocketService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link">UserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WebsocketService.html" data-type="entity-link">WebsocketService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>接口</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/GroupMes.html" data-type="entity-link">GroupMes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GroupRelationshipMes.html" data-type="entity-link">GroupRelationshipMes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RandomAvatar.html" data-type="entity-link">RandomAvatar</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegisterUserMes.html" data-type="entity-link">RegisterUserMes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserBasicMes.html" data-type="entity-link">UserBasicMes</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>其他</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">函数</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">变量</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>文档概览</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        文档生成使用 <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
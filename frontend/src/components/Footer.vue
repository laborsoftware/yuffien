<template lang="pug">
    .footer 
        #main-footer
            //- img(src="/assets/images/bg-footer-top-desktop.svg" alt="" class=" footer-s svg")
        .footer-bg
            a-layout-content
                .footer-content
                    a-col(span="24")
                        .lg-heading Yuffien
                        p
                            | Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente a aliquam debitis unde dolor commodi, sit vero! Perferendis?
                        p
                            a(href="#")
                                a-icon(type="github")
                                |&nbsp; Github
                    a-col(span="24")
                        .m-heading Son güncellemeler
                        p
                            | Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente a aliquam debitis unde dolor commodi, sit vero! Perferendis?
                        ul
                            li Type 1
                            li Type 2
                .attribution
                    | Yuffie &nbsp;
                    a-icon(type="copyright")
                    | &nbsp; Web Tabanlı Discord Botu        
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import 'public/assets/scss/global';

.ant-layout-footer {
    background-color: $thema-background-color !important;
    color: white;
    padding:0px !important;
}

</style>

<style lang="scss" scoped>
.svg {
    display:block;
    width:100%;
}

.ant-layout-content{
    background: #090809 !important;

}

.footer-bg {
    .container {
        max-width: 1100px;
        margin: auto;
        padding: 0 2rem;
        overflow: hidden;
    }

    .footer-content{
        display:grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
        padding:2rem 0;

        .lg-heading{
            font-size: 2.3rem;
        }

        .m-heading {
            font-size: 1.5rem;
        }
        
        p{
            margin-bottom: .7rem;
        }
    }

    .attribution{
        padding:0 0;
        text-align:center;
    }
}


</style>
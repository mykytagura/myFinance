import React from 'react';
import StyledText from "@/src/shared/StyledText";
import PageLayout from "@/src/shared/PageLayout";

const MainPage = () => {
    return <PageLayout
        headerRender={() => <StyledText theme={'dark'}>main page</StyledText>}
        bodyRender={() => <StyledText fontSize={'4xl'}>in page </StyledText>}
        footerRender={() => <StyledText>f page</StyledText>}
    />
};

export default MainPage;
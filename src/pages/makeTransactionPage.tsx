import React from 'react';
import StyledText from "@/src/shared/StyledText";
import PageLayout from "@/src/shared/PageLayout";

const MakeTransactionPage = () => {
    return (
        <PageLayout
            headerRender={() => <StyledText>make transaction</StyledText>}
            bodyRender={() => <StyledText>make transaction</StyledText>}
        />
    );
};

export default MakeTransactionPage;
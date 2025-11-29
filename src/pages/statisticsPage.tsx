import React from 'react';
import StyledSafeAreaView from "@/src/shared/StyledSafeAreaView";
import StyledText from "@/src/shared/StyledText";
import PageLayout from "@/src/shared/PageLayout";

const StatisticsPage = () => {
    return (
        <PageLayout
            headerRender={() => <StyledText>statistics</StyledText>}
            bodyRender={() => <StyledText>statistics</StyledText>}
        />
    );
};

export default StatisticsPage;